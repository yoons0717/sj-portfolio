import { Profile } from '@/types/portfolio'

interface ProfileSectionProps {
    profile: Profile
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
    return (
        <div className="flex p-8 mb-12 bg-gradient-to-r from-[#2a1329] to-[#221122] rounded-2xl shadow-2xl">
            <div className="flex w-full flex-col gap-8 md:flex-row md:items-center">
                <div className="flex gap-8 items-center flex-1">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-40 w-40 ring-4 ring-[#c893c8]/30 shadow-xl"
                        style={{
                            backgroundImage: `url("${profile.avatar}")`,
                        }}
                    />
                    <div className="flex flex-col justify-center flex-1">
                        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] mb-3">
                            {profile.name}
                        </h2>
                        <p className="text-[#c893c8] text-xl font-medium leading-normal mb-4">
                            {profile.title}
                        </p>
                        <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                            {profile.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}