import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSuccess("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 dark:bg-gray-900 dark:text-gray-100"
    >
      {/* Header */}
      <div className="max-w-xl sm:mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Have questions or need support? Fill out the form below or reach us
          directly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="bg-white rounded-[2.5px] dark:bg-gray-800 shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-[2.5px] border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-100"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-[2.5px] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-100"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-[2.5px] dark:border-gray-700 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-100"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 h-32 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-gray-100"
              required
            ></textarea>
            <button
              type="submit"
              className="text-white font-semibold px-6 py-3 w-full transition duration-300 cursor-pointer"
              style={{
                backgroundColor: "#009CFE",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005DB5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#009CFE")
              }
            >
              Send Message
            </button>
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-[#009CFE] w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Address
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                123 ParcelXpress St, Dhaka, Bangladesh
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="text-[#009CFE] w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Phone
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                +880 1632 165523
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-[#009CFE] w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Email
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                support@parcelxpress.com
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-6 w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
