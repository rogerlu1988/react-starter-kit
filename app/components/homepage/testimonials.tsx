import { Card, CardContent } from "~/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Finally lost 20 pounds because I knew my money was on the line. The charity donation feature made me care even more about not failing.",
      author: "Sarah M.",
      role: "Marketing Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9f3c133?w=64&h=64&fit=crop&crop=face"
    },
    {
      quote: "Completed my first marathon thanks to BetOnYou. Having real money at stake made all the difference in my training consistency.",
      author: "James K.",
      role: "Software Engineer", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Early Users Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}