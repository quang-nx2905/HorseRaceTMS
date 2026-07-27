

function Footer() {
    return (
        <footer className="bg-white border-t border-zinc-200 text-zinc-500 py-6 px-8 mt-auto text-center text-sm flex flex-col gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 overflow-hidden flex items-center justify-center">
                    <img src="/src/assets/logo.png" alt="Horse Racing Logo" className="w-full h-full object-cover rounded-xl shadow-sm" />
                </div>
                <span className="font-black text-zinc-900 text-lg tracking-tight">HorseRace<span className="text-orange-500">TMS</span></span>
            </div>

            <div className="flex gap-4 font-medium text-zinc-600">
                <span>Email: <a href="mailto:contact_horserace@gmail.com" className="hover:text-blue-500 hover:underline transition-colors">contact_horserace@gmail.com</a></span>
                <span className="text-zinc-300">|</span>
                <span>Hotline: 090 123 4567</span>
            </div>
            <div className="text-xs">
                &copy; {new Date().getFullYear()} HorseRace TMS. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
