import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClipboardCheck, Handshake, User, UserPlus } from "lucide-react";
import { getCoachByUsername } from "@/lib/coaches";
import { ProfileHero } from "@/components/profile/profile-hero";
import { PartnersSection } from "@/components/profile/partners-section";
import { ProfileAbout } from "@/components/profile/about-section";
import {
  ServicesSection,
  type ServiceCardData,
} from "@/components/profile/services-section";
import { ProcessSection } from "@/components/profile/process-section";
import { SuccessStoriesSection } from "@/components/profile/success-stories-section";
import { BlogSection } from "@/components/profile/blog-section";

type CoachProfilePageProps = {
  params: Promise<{ username: string }>;
};

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
];

export async function generateMetadata({
  params,
}: CoachProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const coach = await getCoachByUsername(username);

  if (!coach) {
    return {
      title: "Coach not found | SlotWise",
    };
  }

  return {
    title: `${coach.name} | BrandElevate`,
    description:
      coach.bio ?? `Book a coaching session with ${coach.name} on BrandElevate.`,
    openGraph: {
      title: `${coach.name} | BrandElevate`,
      description:
        coach.bio ??
        `Book a coaching session with ${coach.name} on BrandElevate.`,
      type: "profile",
      images: coach.avatarUrl
        ? [{ url: coach.avatarUrl, alt: coach.name }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: `${coach.name} | BrandElevate`,
      description:
        coach.bio ??
        `Book a coaching session with ${coach.name} on BrandElevate.`,
    },
  };
}

export default async function CoachProfilePage({
  params,
}: CoachProfilePageProps) {
  const { username } = await params;
  const coach = await getCoachByUsername(username);

  if (!coach) {
    notFound();
  }

  const primarySession = coach.sessionTypes[0];
  const featuredSlug =
    coach.sessionTypes.find((session) => session.price !== null)?.slug ??
    primarySession?.slug;
  const fallbackSlug = primarySession?.slug ?? "discovery-call";

  const fromDb: ServiceCardData[] = coach.sessionTypes.map((session, index) => ({
    id: session.id,
    title: session.title,
    slug: session.slug,
    description: session.description,
    duration: session.duration,
    price: session.price,
    imageUrl: SERVICE_IMAGES[index % SERVICE_IMAGES.length],
    featured: session.slug === featuredSlug,
  }));

  const extras: ServiceCardData[] = [
    {
      id: "extra-linkedin",
      title: "LinkedIn & Social Profile Makeover",
      slug: fallbackSlug,
      description:
        "Optimize your digital footprint for visibility, clarity, and inbound opportunities.",
      duration: 45,
      price: 12000,
      imageUrl: SERVICE_IMAGES[2],
    },
    {
      id: "extra-content",
      title: "Content Strategy & Visibility Coaching",
      slug: fallbackSlug,
      description:
        "Build a weekly content system that grows trust without living on social all day.",
      duration: 60,
      price: 18000,
      imageUrl: SERVICE_IMAGES[3],
    },
  ];

  const services = [...fromDb, ...extras].slice(0, 4);
  if (services.length > 0 && !services.some((s) => s.featured)) {
    services[0].featured = true;
  }

  const stats = [
    { label: "Successful Members", value: "200+", icon: User },
    { label: "Followers Generated", value: "6M+", icon: UserPlus },
    { label: "Satisfied Clients", value: "3k+", icon: Handshake },
    { label: "Branding Projects", value: "500+", icon: ClipboardCheck },
  ];

  const primarySessionHref = primarySession
    ? `/${coach.username}/${primarySession.slug}`
    : "#services";

  return (
    <main className="flex-1 bg-background">
      <ProfileHero
        name={coach.name}
        bio={coach.bio}
        stats={stats}
        primarySessionHref={primarySessionHref}
      />

      <PartnersSection />

      <ProfileAbout
        name={coach.name}
        bio={coach.bio}
        avatarUrl={coach.avatarUrl}
      />

      <ServicesSection
        username={coach.username}
        services={services}
        primarySessionHref={primarySessionHref}
      />

      <ProcessSection />

      <SuccessStoriesSection />

      <BlogSection />
    </main>
  );
}
