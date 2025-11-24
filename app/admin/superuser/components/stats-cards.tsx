import { Users, FileText, MessageSquare, Eye, PlusCircle, Zap } from "lucide-react";

interface PlatformStats {
  total_authors: number;
  total_articles: number;
  total_comments: number;
  total_views: number;
}

interface StatsCardsProps {
  stats: PlatformStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Authors",
      value: stats.total_authors,
      icon: Users,
      color: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-200/50",
      iconColor: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Articles",
      value: stats.total_articles,
      icon: PlusCircle,
      color: "from-green-500/20 to-emerald-600/20",
      border: "border-green-200/50",
      iconColor: "text-green-600",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Total Comments",
      value: stats.total_comments,
      icon: MessageSquare,
      color: "from-purple-500/20 to-pink-600/20",
      border: "border-purple-200/50",
      iconColor: "text-purple-600",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Total Views",
      value: stats.total_views.toLocaleString(),
      icon: Zap,
      color: "from-orange-500/20 to-red-600/20",
      border: "border-orange-200/50",
      iconColor: "text-orange-600",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group relative overflow-hidden"
          >
            {/* Background Blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl" />
            
            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-br bg-clip-text text-transparent bg-gray-900 dark:from-white dark:to-gray-300">
                    {card.value}
                  </p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Animated underline */}
              <div className="mt-4">
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${card.gradient} transition-all duration-500 rounded-full`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}