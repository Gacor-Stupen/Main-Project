// src/components/ui/TeamGrid.jsx
import { TeamMemberCard } from "./TeamMemberCard";

export default function TeamGrid({ members = [] }) {
  return (
    <div className="mt-12 md:mt-16 w-full max-w-5xl mx-auto">
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.id ?? index}
            imageUrl={member.image}
            name={member.name}
            role={member.role}
          />
        ))}
      </div>
    </div>
  );
}