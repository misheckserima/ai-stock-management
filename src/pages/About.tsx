import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout title="About" description="Learn more about AI StockWise">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E1E2D] mb-4">About AI StockWise</h1>
          <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[#ff69b4]/20">
            <img
              src="/about.jpg"
              alt="Misheck Serima"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-[#1E1E2D]/70 max-w-2xl mx-auto">
            Welcome to AI StockWise, a cutting-edge inventory management system developed by Misheck Serima.
            This project showcases my expertise in web development and my commitment to creating efficient business solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ff69b4]/10">
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-4">Project Vision</h2>
            <p className="text-[#1E1E2D]/70">
              AI StockWise represents my vision of modernizing inventory management through artificial intelligence
              and user-centric design, making stock management more intuitive and efficient.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ff69b4]/10">
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-4">Technical Expertise</h2>
            <ul className="list-disc list-inside text-[#1E1E2D]/70">
              <li>React & TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Node.js & Express</li>
              <li>Database Management</li>
              <li>AI Integration</li>
              <li>RESTful APIs</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-[#ff69b4]/10">
            <h2 className="text-xl font-semibold text-[#1E1E2D] mb-4">Professional Background</h2>
            <p className="text-[#1E1E2D]/70">
              With extensive experience in full-stack development and a passion for creating
              innovative solutions, I specialize in building scalable web applications that
              solve real-world business challenges.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#1E1E2D]/70">
            Want to learn more about my work or discuss potential collaborations?{" "}
            <a href="mailto:support@aistockwise.com" className="text-[#ff69b4] hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About; 