import FormWizard from './components/FormWizard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-[860px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-gray-900 tracking-tight">
              Project Intake
            </h1>
            <p className="text-[11px] text-gray-400">Web Design, Development & Marketing</p>
          </div>
          <div className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">Confidential</div>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-6 py-8">
        <FormWizard />
      </main>

      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-[860px] mx-auto px-6 py-5 text-center">
          <p className="text-[11px] text-gray-400">
            Your information is kept confidential and will only be used to prepare your project proposal.
          </p>
        </div>
      </footer>
    </div>
  );
}
