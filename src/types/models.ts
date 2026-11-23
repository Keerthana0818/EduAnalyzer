import type { BloomLevel } from '../lib/bloomsTaxonomy';

export type UserRole = 'faculty' | 'student';

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  facultyId: string;
  facultyName?: string;
  isPublished: boolean;
  totalStudents?: number;
  totalAssessments?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseUnit {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  description?: string;
  topics?: CourseTopic[];
}

export interface CourseTopic {
  id: string;
  unitId: string;
  title: string;
  description?: string;
}

export interface LearningOutcome {
  id: string;
  courseId: string;
  code: string; // e.g. "CLO-1"
  description: string;
  bloomLevel: BloomLevel;
  targetScorePercentage: number;
}
