import Layout from "@/components/Layout";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <Layout title="Contact" description="Get in touch with us">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E1E2D] mb-4">Contact Me</h1>
          <p className="text-lg text-[#1E1E2D]/70 max-w-2xl mx-auto">
            Feel free to reach out for collaborations, questions, or just to say hello!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Email Contact */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-[#ff69b4]/10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#ff69b4]/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#ff69b4]" />
            </div>
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-2">Email</h2>
            <a 
              href="mailto:serimaahsur@gmail.com" 
              className="text-[#1E1E2D]/70 hover:text-[#ff69b4] transition-colors"
            >
              serimaahsur@gmail.com
            </a>
          </div>

          {/* Phone Contact */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-[#ff69b4]/10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#ff69b4]/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#ff69b4]" />
            </div>
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-2">Phone</h2>
            <a 
              href="tel:+263773385732" 
              className="text-[#1E1E2D]/70 hover:text-[#ff69b4] transition-colors"
            >
              +263 77 338 5732
            </a>
          </div>

          {/* Location */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-[#ff69b4]/10 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#ff69b4]/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#ff69b4]" />
            </div>
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-2">Location</h2>
            <p className="text-[#1E1E2D]/70">
              Melfort park, Harare<br />
              Zimbabwe
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg border border-[#ff69b4]/10">
          <h2 className="text-2xl font-bold text-[#1E1E2D] mb-6 text-center">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1E1E2D]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-[#ff69b4]/10 px-3 py-2 text-[#1E1E2D] shadow-sm focus:border-[#ff69b4] focus:outline-none focus:ring-1 focus:ring-[#ff69b4]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1E1E2D]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-[#ff69b4]/10 px-3 py-2 text-[#1E1E2D] shadow-sm focus:border-[#ff69b4] focus:outline-none focus:ring-1 focus:ring-[#ff69b4]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#1E1E2D]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border border-[#ff69b4]/10 px-3 py-2 text-[#1E1E2D] shadow-sm focus:border-[#ff69b4] focus:outline-none focus:ring-1 focus:ring-[#ff69b4]"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-[#ff69b4] text-white rounded-md hover:bg-[#ff69b4]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff69b4] focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Contact; 