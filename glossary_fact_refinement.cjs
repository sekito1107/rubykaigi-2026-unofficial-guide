const fs = require('fs');
const glossaryPath = './src/data/technology_glossary.json';
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

const updates = {
  "Funicular": {
    "detail": "Funicular（フニキュラー）は、PicoRuby.WASMを基盤としてWebブラウザ上で動作するフロントエンドフレームワークです。PicoRubyのマルチタスク機能を活用し、ブラウザ上でRubyベースのアプリケーションを実行するための構造を提供します。JavaScriptの手続きを介さず、Ruby中心にフロントエンド開発を行うための設計事例です。"
  },
  "ASTro": {
    "detail": "ASTroは、RubyプログラムのAST（抽象構文木）を解析・最適化し、C言語ソースコードを生成してネイティブ実行を実現するための研究用フレームワークです。VMバイトコードを介さずに、ASTから直接高度に最適化されたコードを導く手法の検証を目的とした実験的プロジェクトです。"
  },
  "ext/profile": {
    "detail": "ext/profileは、プロファイラをCRuby内部に埋め込むことで、VM外部からの観測では困難な内部イベント（GVLのスレッドスイッチ、GCの発火、JITの影響等）の正確な計測を可能にする設計です。従来の外部サンプリング方式におけるバイアスや限界を克服する手法として開発されています。"
  },
  "Hash": {
    "detail": "Hash（ハッシュ）は、名前に関連付けてデータを保存するデータ構造です。TruffleRuby（GraalVM）などで実績のある「並列読み書きとスレッド安全性の両立」を、単一スレッドでの性能を維持したままCRubyへ導入するための再実装手法が研究されています。"
  },
  "pybind11": {
    "detail": "C++とスクリプト言語を繋ぐ「架け橋」となるライブラリです。Rubyにおいてffi-clangやRiceを活用したモダンなC++ツールチェーンを構築し、PyTorchやOpenCVなどの大規模なC++ライブラリをRubyから直接操作可能にする実装手法が検証されています。"
  },
  "Uzumibi": {
    "detail": "Uzumibiは、mruby/edgeの上に構築された軽量Webフレームワークです。Cloudflare Workers、Fastly Compute、Spinなど複数のエッジプラットフォームで同一のRubyコードを実行可能にし、プラットフォームに依存しないシンプルなWeb APIを提供します。"
  },
  "ZJIT": {
    "detail": "メソッドのインライン化や副作用分析（side effect analysis）などの高度なコンパイラ最適化をRubyに適用するJITコンパイル技術です。Ruby 4.1以降で、実行時のボトルネックを解消するための主要な高速化基盤として開発が進められています。"
  },
  "monoruby": {
    "detail": "Rustでゼロから実装されたRuby処理系です。JITコンパイラの研究・実験プラットフォームとして開発されており、Rubyの動的な性質を扱うための不変条件（Invariants）や逆最適化（Deoptimization）の実装。検証に活用されています。"
  },
  "Portability": {
    "detail": "POSIX準拠を核としつつ、WASM、マイコン、Windowsなど幅広い動作環境において同一のコードを安定して動作させるための設計指針です。特定のプラットフォームに依存しない機能提供の在り方を指します。"
  },
  "Web Audio": {
    "detail": "Ruby/WASMを使って、ブラウザの音響処理をRubyコードで制御します。シンセサイザーの構築や、プログラムの動作状態を音に変換する（可聴化）といった技術検証に利用されます。"
  }
};

for (const [key, val] of Object.entries(updates)) {
  if (glossary[key]) {
    if (val.description) glossary[key].description = val.description;
    if (val.detail) glossary[key].detail = val.detail;
  }
}

fs.writeFileSync(glossaryPath, JSON.stringify(glossary, null, 2) + '\n', 'utf8');
console.log('Glossary facts-only refinement completed.');
