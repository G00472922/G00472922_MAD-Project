export interface RawMovie {
  id: number;
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
}

export interface Movie {
  id: number;
  title: string;
  releaseDate?: string;
  overview?: string;
  poster?: string;
}

export interface RawCastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string;
}

export interface CastMember {
  id: number;
  castName: string;
  role?: string;
  profile?: string;
}

export interface RawCrewMember {
  id: number;
  name: string;
  job?: string;
  profile_path?: string;
}

export interface CrewMember {
  id: number;
  crewName: string;
  job?: string;
  profile?: string;
}

export interface MemberDetails {
  id: number;
  memberName: string;
  profile?: string;
  aka?: string[];
  birthday?: string;
  deathday?: string;
  birthplace?: string;
  biography?: string;
}
