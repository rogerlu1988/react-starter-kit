import { Trophy, Heart, Zap, Users } from "lucide-react";

export default function WhyItWorks() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Goal Tracking",
      description: "Personalized dashboards with progress tracking, milestones, and smart reminders to keep you on track."
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Charity Integration",
      description: "Choose from verified charities. Your failed stakes become meaningful donations to causes you care about."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Achievements",
      description: "Unlock badges, build streaks, and level up. Gamified progress that makes achieving goals addictive."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community",
      description: "Join accountability groups, share progress, and get support from others on similar journeys."
    }
  ];

  return (
    <section id="why-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why BetOnYou Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to keep you accountable and motivated
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}