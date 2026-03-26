require 'net/http'
require 'uri'
require 'json'
require 'cgi'

# RubyKaigi 2026 スケジュール抽出スクリプト
# このスクリプトは HTML を解析して JSON に変換します。

BASE_URL = "https://rubykaigi.org"

def fetch_content(url)
  puts "Fetching #{url}..."
  uri = URI.parse(url)
  response = Net::HTTP.get_response(uri)
  
  # リダイレクト(301, 302)に対応
  if response.is_a?(Net::HTTPRedirection)
    puts "Redirected to #{response['location']}"
    return fetch_content(response['location'])
  end
  
  return nil unless response.code == "200"
  response.body.force_encoding('UTF-8')
end

def fetch_abstract(path)
  return "" if path.nil? || path.empty?
  
  html = fetch_content(BASE_URL + path)
  return "" unless html
  
  # 正しいクラス名 c-presentation-content__description を使用
  # <div class='c-presentation-content__description'>...</div> の中身を抽出
  description_match = html.match(/<div class='c-presentation-content__description'>(.*?)<\/div>/m)
  
  unless description_match
    # 互換性のため以前のパターンも残すが、主な対象は上記
    description_match = html.match(/<h1.*?>.*?<\/h1>.*?<p>(.*?)<\/p>/m)
  end

  return "" unless description_match
  
  abstract_content = description_match[1]
  
  # HTMLタグを除去するが、改行などを適切に処理
  # 段落の区切り <p> を 2つの改行に変換
  text = abstract_content.gsub(/<\/p>/, "\n\n")
                         .gsub(/<br\s*\/?>/, "\n")
                         .gsub(/<.*?>/, '')
                         .gsub(/&nbsp;/, ' ')
  
  # 余分な空白を除去しつつ、段落構造を維持
  CGI.unescapeHTML(text).split("\n").map(&:strip).reject(&:empty?).join("\n\n").strip
end

def parse_html(html, day)
  return [] unless html
  sessions = []
  
  # テーブルの各行(tr)を抽出します
  # Rubyの正規表現を使って、時間とセッションが含まれる行を探します
  rows = html.scan(/<tr class='c-schedule-table__row'>(.*?)<\/tr>/m)
  
  rows.each do |row_content|
    # 時間を抽出
    time_match = row_content[0].match(/<th class='c-schedule-table__time'>(.*?)<\/th>/m)
    next unless time_match
    
    # 改行やHTMLタグを除去し、空白を1つにまとめる
    time_str = time_match[1].gsub(/<.*?>/, ' ').gsub(/\s+/, ' ').strip
    
    # "10:50 – 11:20" や "10:50 ?? 11:20" などの形式から時間を分割
    # ハイフンやダッシュ、?? など、いろいろな区切り文字に対応させる
    times = time_str.split(/\s+[-–?]+\s+/)
    start_time = times[0] || ""
    end_time = times[1] || ""
    
    # 各会場(td)を抽出
    # <td class='c-schedule-table__event...'>...</td> を探します
    tds = row_content[0].scan(/<td class='c-schedule-table__event(.*?)'>(.*?)<\/td>/m)
    
    rooms = ['Large', 'Sub', 'Small']
    
    tds.each_with_index do |td_matches, index|
      td_class = td_matches[0]
      content = td_matches[1]
      
      # colspan='3' (全会場共通) かどうかをクラス名や中身から判定
      is_break = td_class.include?('--break')
      
      # ブレイクタイム（開場、昼食など）なら全会場に、そうでなければその会場に割り当て
      target_rooms = is_break ? rooms : [rooms[index]]
      
      target_rooms.each do |room|
        next unless room
        
        # セッション情報 または ブレイク情報（<span>で囲まれている）があるかチェック
        if content.include?('c-schedule-item') || is_break
          title = content.match(/<div class='c-schedule-item__title'>(.*?)<\/div>/m)&.[](1)&.strip || 
                  content.match(/<span>(.*?)<\/span>/m)&.[](1)&.strip || ""
          
          speaker = content.match(/<span class='c-schedule-item-speaker__name'>(.*?)<\/span>/m)&.[](1)&.strip || ""
          twitter = content.match(/<span class='c-schedule-item-speaker__id'>(.*?)<\/span>/m)&.[](1)&.strip || ""
          lang = content.match(/<span class='c-schedule-item__tag'>(.*?)<\/span>/m)&.[](1)&.strip || "JA"
          
          # 詳細ページへのリンクを抽出
          detail_path = content.match(/href='(.*?)'/m)&.[](1)
          
          if title != ""
            clean_start_time = start_time.gsub(/[^0-9]/, '')
            
            # 詳細情報を取得しに行く
            abstract = ""
            official_url = BASE_URL + (detail_path || "/2026/schedule/")
            
            if detail_path && !is_break
              abstract = fetch_abstract(detail_path)
              sleep 0.1 # サーバーに優しく
            end

            sessions << {
              id: "d#{day}-#{clean_start_time}-#{room.downcase}",
              type: (speaker == "" || is_break) ? 'event' : 'session',
              day: day,
              startTime: start_time,
              endTime: end_time,
              room: room,
              title: CGI.unescapeHTML(title),
              speakerName: CGI.unescapeHTML(speaker),
              twitter: twitter,
              language: lang,
              abstract: abstract,
              officialUrl: official_url
            }
          end
        end
      end
      
      # colspan='3' の場合はこの行の処理を終了
      break if is_break
    end
  end
  
  sessions
end

# 実行
all_sessions = []
[
  { url: "#{BASE_URL}/2026/schedule/", day: 1 },
  { url: "#{BASE_URL}/2026/schedule/day2/", day: 2 },
  { url: "#{BASE_URL}/2026/schedule/day3/", day: 3 }
].each do |target|
  all_sessions.concat(parse_html(fetch_content(target[:url]), target[:day]))
end

# 結果を JSON として保存
File.write('src/data/sessions.json', JSON.pretty_generate(all_sessions))
puts "Successfully saved #{all_sessions.size} sessions to src/data/sessions.json"
