'use client';

import React, { useEffect, useState } from 'react';
import { FaCode, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';

interface LeetCodeData {
    username: string;
    totalSolved: number;
    contestRanking: {
        rating: number;
        badge: {
            name: string;
            icon: string;
        };
    };
}

interface Achievement {
    id: number;
    title: string;
    rating: string;
    description: {
        username: string;
        rating: string;
        stars: string;
    };
    desc: string;
    icon: string;
    link: string;
    bgGradient: string;
    stats: string;
    bgImage: string; // added background image url field
}

const Achievements = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: 1,
            title: 'CodeChef',
            rating: '4⭐ (1967)',
            description: {
                username: 'bot_durgesh',
                rating: '1967',
                stars: '4⭐',
            },
            desc: "",
            icon: '/CC.jpg',
            link: 'https://www.codechef.com/users/bot_durgesh',
            bgGradient: 'from-blue-500 to-pink-500',
            stats: '806 Problems Solved',
            bgImage: '/backgrounds/codechef-bg.jpg',
        },
        {
            id: 2,
            title: 'LeetCode',
            rating: 'Knight (1942)',
            description: {
                username: 'bot_durgesh',
                rating: '1942',
                stars: 'Knight',
            },

            desc: "",
            icon: '/LC.jpg',
            link: 'https://leetcode.com/u/Bot_Durgesh',
            bgGradient: 'from-yellow-500 to-orange-500',
            stats: '650 Problems Solved',
            bgImage: '/LC-Knight.png',
        },
        {
            id: 3,
            title: 'Codeforces',
            rating: 'Specialist (1560)',
            description: {
                username: 'bot_durgesh1',
                rating: '1560',
                stars: 'Specialist',
            },
            desc: "",
            icon: '/CF.jpg',
            link: 'https://codeforces.com/profile/bot_durgesh1',
            bgGradient: 'from-blue-500 to-cyan-500',
            stats: '450 Problems Solved',
            bgImage: '/backgrounds/codeforces-bg.jpg',
        },
        {
            id: 4,
            title: 'CodeQuest-AZ Winner',
            rating: '🏆 1st Prize Winner',
            description: {
                username: 'your-username',
                rating: '1967',
                stars: '4⭐',
            },
            desc: 'Winner of CodeQuest-AZ 2024 Organized by Alogzenith VIIT over 400 participants.',
            icon: '/tropy-1.jpg',
            link: 'https://www.linkedin.com/posts/ankoji-durgesh_codingjourney-algozenithviit-codequestchampion-activity-7252301153550389248-nWFE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEjxIRsB2CAYDLwfKL51d-KJc4VWE1r1nbc',
            bgGradient: 'from-fuchsia-600 via-yellow-400 to-orange-500',
            stats: 'Top 1',
            bgImage: '/backgrounds/trophy-bg.jpg',
        },
        {
            id: 5,
            title: 'CodeQuest-JNTUGV Winner',
            rating: '🏆 3rd Prize Winner',
            description: {
                username: 'your-username',
                rating: '1967',
                stars: '4⭐',
            },
            desc: 'Winner of CodeQuest 2024 Organized by JNTUGV over 500 participants.',
            icon: '/tropy-1.jpg',
            link: 'https://www.linkedin.com/posts/ankoji-durgesh_i-am-thrilled-to-share-that-i-secured-the-activity-7292967364243972096-9yjo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEjxIRsB2CAYDLwfKL51d-KJc4VWE1r1nbc',
            bgGradient: 'from-amber-500 via-lime-400 to-emerald-500',
            stats: 'Top 3',
            bgImage: '/backgrounds/trophy-bg.jpg',
        },
    ]);

    useEffect(() => {
        // Fetch CodeChef data
        const fetchCodeChefData = async () => {
            try {
                const res = await fetch('/api/codechef?username=bot_durgesh');
                const json = await res.json();
                setAchievements((prev) =>
                    prev.map((ach) =>
                        ach.title === 'CodeChef'
                            ? {
                                ...ach,
                                rating: `${json.stars} (${json.rating})`,
                                link: `https://www.codechef.com/users/${json.username}`,
                                stats: `${json.problemsSolved} Problems Solved`,
                                description: {
                                    username: json.username,
                                    rating: json.rating,
                                    stars: json.stars,
                                },
                            }
                            : ach
                    )
                );
            } catch (error) {
                console.error('Failed to fetch CodeChef data', error);
            }
        };

        // Fetch LeetCode data
        const fetchLeetCodeData = async () => {
            try {
                const res = await fetch('https://leetscan.vercel.app/Bot_Durgesh');
                const json = await res.json();
                const badgeName = json.contestRanking?.badge?.name || 'Unrated';
                // Floor the rating value
                const rating = typeof json.contestRanking?.rating === "number"
                    ? Math.floor(json.contestRanking.rating)
                    : 'N/A';

                setAchievements((prev) =>
                    prev.map((ach) =>
                        ach.title === 'LeetCode'
                            ? {
                                ...ach,
                                rating: `${badgeName} (${rating})`,
                                link: `https://leetcode.com/${json.username}`,
                                stats: `${json.totalSolved} Problems Solved`,
                                description: {
                                    username: json.username,
                                    rating: rating.toString(),
                                    stars: badgeName,
                                },
                            }
                            : ach
                    )
                );
            } catch (error) {
                console.error('Failed to fetch LeetCode data', error);
            }
        };

        fetchCodeChefData();
        fetchLeetCodeData();
    }, []);
    return (
        <div className="py-20 scroll-mt-24" id="achievements">
            <h1 className="heading">
                My Coding <span className="text-purple">Achievements</span>
            </h1>

            <div className="h-[700px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 max-w-6xl mx-auto">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"

                    >
                        {/* Gradient overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${achievement.bgGradient} opacity-90 group-hover:opacity-20 transition-opacity duration-300`}
                        />

                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                        <div className="relative p-6 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={achievement.icon}
                                        alt={achievement.title + " icon"}
                                        className="w-full h-full rounded-lg object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-sm text-purple-400 font-medium">
                                        {achievement.rating}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            {achievement.id >= 4 ? (
                                <p className="text-white text-base font-bold mb-4">{achievement.desc}</p>
                            ) : (
                                <div className="font-bold text-white text-lg leading-relaxed mb-4 flex-grow space-y-1">
                                    <p>
                                        <span className="text-purple-400 font-semibold">Username:</span> {achievement.description.username}
                                    </p>
                                    <p>
                                        <span className="text-purple-400 font-semibold">Rating:</span> {achievement.description.rating}
                                    </p>
                                    <p>
                                        <span className="text-purple-400 font-semibold">status:</span> {achievement.description.stars}
                                    </p>
                                </div>
                            )}

                            {/* Stats */}
                            <div className="mb-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                    Progress
                                </p>
                                <p className="text-white font-semibold">{achievement.stats}</p>
                            </div>

                            {/* Link */}
                            <a
                                href={achievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                            >
                                View Profile
                                <FaExternalLinkAlt className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Animated border */}
                        <div
                            className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                            style={{
                                background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #8b5cf6)',
                                backgroundSize: '300% 300%',
                                animation: 'gradient 3s ease infinite',
                            }}
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
        </div>
    );
};

export default Achievements;
