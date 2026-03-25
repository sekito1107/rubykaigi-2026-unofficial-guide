export interface Session {
  id: string;               // データの識別子
  type: 'session' | 'event'; // 'event' は Door Open など
  day: number;               // 1, 2, 3
  startTime: string;        // "08:30"
  endTime: string;          // "09:30"
  room: 'Large' | 'Sub' | 'Small'; // 会場名
  title: string;
  speakerName: string;      // 登壇者（イベントの場合は空文字）
  twitter: string;          // Twitter ID（ない場合は空文字）
  language: string;         // "JA" | "EN"
  abstract: string;         // 概要
  officialUrl: string;      // 公式サイトへの詳細リンク
}
