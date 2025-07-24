import { Card, CardContent } from "~/components/ui/card";
import { Target, DollarSign, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Set Your Goal",
      description: "Define your goal with a clear deadline. Whether it's fitness, learning, or habits—make it specific and measurable.",
      bgColor: "bg-orange-500"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Stake Your Money",
      description: "Put your money where your mouth is. Choose an amount that motivates you—it's your skin in the game.",
      bgColor: "bg-orange-500"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Succeed or Donate",
      description: "Hit your goal and keep your money plus earn achievements. Miss it? Your stake goes to your chosen charity.",
      bgColor: "bg-orange-500"
    }
  ];

  return (
    <section id="how-it-works" className="pt-12 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to turn your goals into achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}