interface DisclaimerModalProps {
  onClose: () => void;
}

const DisclaimerModal = ({ onClose }: DisclaimerModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg bg-[#0f1c35] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-ruby-red uppercase font-black tracking-[0.2em] mb-1">
              About This App
            </p>
            <h2 className="text-lg font-black text-white leading-tight">
              RubyKaigi 2026 Unofficial Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1 -mr-1 -mt-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5" />

        {/* Content */}
        <div className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
          <p>
            このアプリは有志による<span className="text-white font-bold">非公式のファンガイド</span>です。
            RubyKaigi 2026 の公式アプリや公式サービスとは一切関係がありません。
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
            <p className="text-[11px] text-slate-500 uppercase font-black tracking-widest">引用について</p>
            <p>
              セッションのタイトル・概要（Abstract）・登壇者名は、
              <a
                href="https://rubykaigi.org/2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ruby-red hover:underline"
              >
                RubyKaigi 2026 公式サイト
              </a>
              より引用しています。
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
            <p className="text-[11px] text-slate-500 uppercase font-black tracking-widest">掲載情報の削除・修正</p>
            <p>
              ご自身の情報（氏名・セッション概要等）の削除・修正をご希望の登壇者の方は、
              以下よりご連絡ください。速やかに対応いたします。
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <a
                href="https://github.com/sekito1107/rubykaigi-2026-unofficial-guide/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Issues
              </a>
              <a
                href="https://twitter.com/sekito1107"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter) @sekito1107
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-slate-300 hover:bg-white/10 transition-colors uppercase tracking-widest mt-1"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
