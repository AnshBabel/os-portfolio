import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import OSWindow from './OSWindow';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = () => {
    if (!name || !email || !message) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      window.open(`mailto:ansh.ababel@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`);
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto" id="contact">
      <SectionHeader icon="✉" title="$ ./contact.exe" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* JSON info */}
        <OSWindow id="contact-json" title="contact_info.json">
          <div className="p-6 font-mono text-sm leading-7">
            <span className="text-foreground">{'{'}</span>
            <div className="pl-4">
              <JsonLine k="status" v='"open_to_work"' vColor="text-os-green" />
              <JsonLine k="email" v='"ansh.ababel@gmail.com"' vColor="text-cyan" link="mailto:ansh.ababel@gmail.com" />
              <span className="text-[#9cdcfe]">"socials"</span>: {'{'}
              <div className="pl-4">
                <JsonLine k="github" v='"@AnshBabel"' vColor="text-[#ce9178]" />
                <JsonLine k="linkedin" v='"@anshbabel"' vColor="text-[#ce9178]" />
               
              </div>
              {'},'}
              <JsonLine k="location" v='"Indore, India"' vColor="text-os-green" />
            </div>
            <span className="text-foreground">{'}'}</span>
            <div className="mt-4 text-os-text-muted">{'// Waiting for connection ...'}</div>
            <span className="inline-block w-1.5 h-4 bg-os-text-muted animate-blink" />
          </div>
        </OSWindow>

        {/* Send message */}
        <OSWindow id="contact-send" title="sendMessage.ts" icon={<span className="text-[10px] px-1.5 py-0.5 bg-[#3178c6] text-foreground rounded font-bold">TS</span>}>
          <div className="p-6 font-mono text-sm">
            <div className="text-os-text-muted mb-2">{'// Run this script to send a message'}</div>
            <div className="text-[#c586c0]">const <span className="text-[#9cdcfe]">send</span> = <span className="text-[#c586c0]">async</span> () <span className="text-foreground">=&gt;</span> {'{'}</div>
            <div className="pl-4 space-y-3 my-3">
              <div className="flex items-center gap-2">
                <span className="text-[#c586c0]">const</span>
                <span className="text-[#9cdcfe]">name</span>
                <span className="text-foreground">=</span>
                <span className="text-[#ce9178]">"</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-transparent border-b border-os-border text-foreground outline-none px-1 w-40 placeholder:text-os-text-muted/50 focus:border-os-cyan transition-colors"
                />
                <span className="text-[#ce9178]">"</span>;
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c586c0]">const</span>
                <span className="text-[#9cdcfe]">email</span>
                <span className="text-foreground">=</span>
                <span className="text-[#ce9178]">"</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  className="bg-transparent border-b border-os-border text-foreground outline-none px-1 w-40 placeholder:text-os-text-muted/50 focus:border-os-cyan transition-colors"
                />
                <span className="text-[#ce9178]">"</span>;
              </div>
              <div>
                <span className="text-[#c586c0]">await</span> <span className="text-[#9cdcfe]">api</span>.<span className="text-[#dcdcaa]">submit</span>({'{'}
              </div>
              <div className="pl-4">
                <span className="text-[#9cdcfe]">name</span>, <span className="text-[#9cdcfe]">email</span>,
              </div>
              <div className="pl-4">
                <span className="text-[#9cdcfe]">message</span> : <span className="text-[#ce9178]">`</span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here ..."
                rows={3}
                className="w-full bg-muted/50 rounded p-3 text-foreground outline-none resize-none placeholder:text-os-text-muted/50 border border-os-border focus:border-os-cyan transition-colors"
              />
              <div><span className="text-[#ce9178]">`</span>{'});'}</div>
            </div>
            <div className="text-foreground">{'}'}</div>
          </div>
          <div className="px-6 pb-6">
            <button
              onClick={handleSend}
              disabled={status === 'sending'}
              className="os-tag-active px-6 py-2.5 flex items-center gap-2 hover:bg-os-cyan/10 transition-all active:scale-95 disabled:opacity-50"
              style={{ borderColor: status === 'sent' ? 'hsl(var(--os-green))' : undefined, color: status === 'sent' ? 'hsl(var(--os-green))' : undefined }}
            >
              <span className="text-os-green">▶</span>
              {status === 'idle' && 'RUN SCRIPT'}
              {status === 'sending' && 'EXECUTING...'}
              {status === 'sent' && '✓ MESSAGE SENT'}
            </button>
          </div>
        </OSWindow>
      </div>
    </section>
  );
}

function JsonLine({ k, v, vColor, link }: { k: string; v: string; vColor: string; link?: string }) {
  const val = link ? (
    <a href={link} className={`${vColor} hover:underline`}>{v}</a>
  ) : (
    <span className={vColor}>{v}</span>
  );
  return (
    <div>
      <span className="text-[#9cdcfe]">"{k}"</span>: {val},
    </div>
  );
}
