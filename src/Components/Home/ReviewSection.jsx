import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    courseName: "JavaScript Essentials",
    review: "This course was amazing! It helped me understand the core concepts of JavaScript effectively.",
    rating: 4.5,
    learnerName: "John Doe",
  },
  {
    courseName: "Python Data Science",
    review: "The course content is top-notch and highly practical. I learned a lot.",
    rating: 4,
    learnerName: "Mary Richard",
  },
  {
    courseName: "React for Beginners",
    review: "Excellent course! The instructor explained everything clearly and concisely.",
    rating: 5,
    learnerName: "Jane Watson",
  },
  {
    courseName: "Python Data Science",
    review: "The course content is top-notch and highly practical. I learned a lot.",
    rating: 4,
    learnerName: "Alice Johnson",
  },
  {
    courseName: "Python Data Science",
    review: "The course content is top-notch and highly practical. I learned a lot.",
    rating: 4,
    learnerName: "Karl Barry",
  },
  
  // Add more testimonials as needed
];

const ReviewSection = () => {
  return (
    <div className="overflow-hidden py-10 px-5 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Learners Say</h2>
      
      {/* Ticker Container */}
      <motion.div
        className="flex space-x-6"
        initial={{ x: 0 }}
        animate={{ x: '-300%' }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
          
        }}
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {/* Duplicate Testimonials for Continuous Loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-start text-left p-6 bg-white shadow-lg rounded-lg min-w-[300px]"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-lg font-semibold">{testimonial.courseName}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 text-sm rounded-full">
                Completed
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-wrap text-center">{testimonial.review}</p>
            <div className="flex items-center mb-4">
              {/* Dynamic Star Rating */}
              {Array(Math.floor(testimonial.rating))
                .fill(<FaStar className="text-yellow-500" />)
                .concat(
                  testimonial.rating % 1 ? (
                    <FaStarHalfAlt className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-yellow-500" />
                  )
                )}
            </div>
            <span className="text-gray-800 font-medium">- {testimonial.learnerName}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewSection;
