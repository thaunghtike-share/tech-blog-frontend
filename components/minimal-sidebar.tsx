"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Server,
  Code,
  Brain,
  Cloud,
  Cog,
  BarChart3,
  Shield,
  Database,
  Globe,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Folder,
  Star,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  post_count?: number;
}

interface FeaturedAuthor {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  featured: boolean;
  job_title?: string;
  company?: string;
  post_count?: number;
}

const getCategoryIconWithColor = (
  categoryName: string
): [React.ComponentType<React.SVGProps<SVGSVGElement>>, string] => {
  const name = categoryName.toLowerCase();
  if (name.includes("devops"))
    return [Server, "bg-emerald-100 text-emerald-600"];
  if (name.includes("python")) return [Code, "bg-yellow-100 text-yellow-600"];
  if (name.includes("ai") || name.includes("ml"))
    return [Brain, "bg-purple-100 text-purple-600"];
  if (name.includes("cloud")) return [Cloud, "bg-sky-100 text-sky-600"];
  if (name.includes("automation"))
    return [Cog, "bg-orange-100 text-orange-600"];
  if (name.includes("monitoring"))
    return [BarChart3, "bg-pink-100 text-pink-600"];
  if (name.includes("security")) return [Shield, "bg-red-100 text-red-600"];
  if (name.includes("database"))
    return [Database, "bg-indigo-100 text-indigo-600"];
  if (name.includes("web")) return [Globe, "bg-cyan-100 text-cyan-600"];
  return [Zap, "bg-gray-100 text-gray-600"];
};

export function MinimalSidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [featuredAuthors, setFeaturedAuthors] = useState<FeaturedAuthor[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState({
    categories: true,
    tags: true,
    authors: true,
  });
  const [error, setError] = useState({
    categories: null as string | null,
    tags: null as string | null,
    authors: null as string | null,
  });

  const API_BASE_URL = "http://192.168.1.131:8000/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ categories: true, tags: true, authors: true });
      setError({ categories: null, tags: null, authors: null });

      try {
        const [catRes, tagRes, authorRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/?count_posts=true`),
          fetch(`${API_BASE_URL}/tags/?count_posts=true`),
          fetch(`${API_BASE_URL}/authors/?featured=true&count_posts=true`),
        ]);

        if (!catRes.ok) throw new Error("Failed to fetch categories");
        if (!tagRes.ok) throw new Error("Failed to fetch tags");
        if (!authorRes.ok) throw new Error("Failed to fetch authors");

        const catData = await catRes.json();
        const tagData = await tagRes.json();
        const authorData = await authorRes.json();

        setCategories(
          Array.isArray(catData.results) ? catData.results : catData
        );
        setTags(Array.isArray(tagData.results) ? tagData.results : tagData);
        setFeaturedAuthors(
          Array.isArray(authorData.results) ? authorData.results : authorData
        );
      } catch (err) {
        setError({
          categories: "Failed to load categories",
          tags: "Failed to load tags",
          authors: "Failed to load authors",
        });
      } finally {
        setLoading({ categories: false, tags: false, authors: false });
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="space-y-6 w-80 max-w-full">
      {/* Services Card */}
      <Card className="border-0 shadow-lg bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">DevOps Services</h3>
                <p className="text-blue-100 text-sm">Professional solutions</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              {[
                {
                  title: "Cloud Migration",
                  desc: "Modernize with Kubernetes & GitOps",
                  icon: <Cloud className="h-5 w-5" />,
                  gradient: "from-sky-500 to-blue-600",
                  url: ""
                },
                {
                  title: "Infrastructure Automation",
                  desc: "Terraform, Ansible, Pulumi",
                  icon: <Cog className="h-5 w-5" />,
                  gradient: "from-orange-500 to-red-600",
                },
                {
                  title: "Web Deployment",
                  desc: "Scalable cloud-native apps",
                  icon: <Globe className="h-5 w-5" />,
                  gradient: "from-cyan-500 to-blue-600",
                },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={`/services/${service.title
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/80 hover:shadow-md transition-all"
                  >
                    <div
                      className={`p-2 bg-gradient-to-r ${service.gradient} rounded-lg shadow-md group-hover:shadow-lg transition-shadow`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {service.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <Sparkles className="h-4 w-4" />
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Categories */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <Folder className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Categories
              </h3>
              <p className="text-sm text-gray-600">Browse by topic</p>
            </div>
          </div>

          {loading.categories ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-10 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200"
                />
              ))}
            </div>
          ) : error.categories ? (
            <div className="text-center py-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-sm">{error.categories}</p>
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(showAllCategories ? categories : categories.slice(0, 6)).map(
                  (category) => {
                    const [Icon, colorClass] = getCategoryIconWithColor(
                      category.name
                    );
                    return (
                      <li key={category.id} className="w-full">
                        <Link
                          href={`/categories/${category.id}`}
                          className="block w-full rounded-xl transition-colors"
                        >
                          <div className="flex items-start gap-3 p-2 rounded-xl border border-transparent bg-white">
                            <div
                              className={`p-1 rounded-lg ${
                                colorClass.split(" ")[0]
                              } shadow-sm shrink-0`}
                            >
                              <Icon
                                className={`h-4 w-4 ${
                                  colorClass.split(" ")[1]
                                }`}
                              />
                            </div>

                            <div className="flex flex-col leading-tight">
                              <span className="text-sm font-medium text-gray-800 hover:text-blue-600 break-words">
                                {category.name}
                              </span>
                              {typeof category.post_count === "number" && (
                                <span className="text-xs text-gray-500 select-none">
                                  {category.post_count} article
                                  {category.post_count !== 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
              {categories.length > 6 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="mt-4 w-full flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-xl hover:bg-blue-50 transition-all border border-blue-200 hover:border-blue-300"
                >
                  {showAllCategories ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      See More
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Folder className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Popular Tags
              </h3>
              <p className="text-sm text-gray-600">Trending topics</p>
            </div>
          </div>

          {loading.tags ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : error.tags ? (
            <div className="text-center py-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-sm">{error.tags}</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 15).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.id}`}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all hover:scale-105 ${
                    tag.post_count && tag.post_count > 5
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md"
                  }`}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Featured Authors
              </h3>
              <p className="text-sm text-gray-600">Expert contributors</p>
            </div>
          </div>

          {loading.authors ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error.authors ? (
            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-sm">{error.authors}</p>
            </div>
          ) : featuredAuthors.length === 0 ? (
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">
                No featured authors available
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredAuthors.map((author) => (
                <div
                  key={author.id}
                  className="group flex items-center gap-4 p-3 hover:bg-white/80 rounded-xl transition-all hover:shadow-md border border-transparent hover:border-blue-100"
                >
                  <div className="relative">
                    <img
                      src={author.avatar || "/placeholder.svg"}
                      alt={author.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md group-hover:shadow-lg transition-shadow"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-avatar.png";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full shadow-md">
                      <Star className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors break-words">
                      {author.name}
                    </h4>
                    <p className="text-sm text-gray-600 break-words">
                      {author.job_title
                        ? `${author.job_title}${
                            author.company ? ` at ${author.company}` : ""
                          }`
                        : "DevOps Engineer"}
                    </p>
                    {author.post_count && (
                      <p className="text-xs text-gray-400 mt-1">
                        {author.post_count}{" "}
                        {author.post_count === 1 ? "post" : "posts"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
