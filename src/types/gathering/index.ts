export interface CreateMeetingForm {
	peopleCount?: number;
	meetingDate: string;
	timeSlot?: "lunch" | "dinner";
	location?: "hongdae" | "gangnam";
}

export type TimeSlot = CreateMeetingForm["timeSlot"];
export type Location = CreateMeetingForm["location"];

export type CreateMeetingStep = "people" | "date" | "location";

export type DistanceRange = "RANGE_500M" | "RANGE_1KM" | "ANY";

export type FoodCategory =
	| "KOREAN"
	| "JAPANESE"
	| "CHINESE"
	| "WESTERN"
	| "ASIAN"
	| "ANY";

export type RankKey = "first" | "second" | "third";

export interface OpinionForm {
	distanceRange?: DistanceRange;
	dislikedFoods: FoodCategory[];
	preferredMenus: {
		first?: FoodCategory;
		second?: FoodCategory;
		third?: FoodCategory;
	};
}

export type OpinionStep = "intro" | "distance" | "dislike" | "preference";

export interface MeetingContext {
	gatheringId: string;
	meetingDate: string;
	stationName: string;
	totalParticipants?: number;
	submittedCount?: number;
}

export interface Restaurant {
	id: string;
	name: string;
	category: FoodCategory;
	rating: number;
	distance: number;
	imageUrl?: string;
	address?: string;
}

export interface FoodVote {
	category: FoodCategory;
	count: number;
}

export interface VoteStatistics {
	totalVotes: number;
	submissionRate: number;
	preferredFoods: FoodVote[];
	dislikedFoods: FoodVote[];
}

export interface RecommendationResult {
	topRecommendation: Restaurant;
	otherCandidates: Restaurant[];
	voteStats: VoteStatistics;
}

export type {
	BaseStepProps,
	IntroStepProps,
	DistanceStepProps,
	DislikeStepProps,
	PreferenceStepProps,
} from "./stepComponents";
