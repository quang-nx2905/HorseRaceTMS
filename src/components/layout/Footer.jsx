import React from 'react';

function Footer() {
    return (
        <footer className="bg-white border-t border-zinc-200 text-zinc-500 py-4 px-8 mt-auto text-center text-sm flex flex-col gap-2 items-center justify-center">
            <div className="flex gap-4 font-medium text-zinc-600">
                <span>Email: <a href="mailto:contact_horserace@gmail.com" className="hover:text-blue-500 hover:underline transition-colors">contact_horserace@gmail.com</a></span>
                <span className="text-zinc-300">|</span>
                <span>Hotline: 090 123 4567</span>
            </div>
            <div>
                &copy; {new Date().getFullYear()} HorseRace TMS. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
