import {
  PencilSquareIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const sidebarLinks = [
  { path: '/', label: 'writeVocab', icon: PencilSquareIcon },
  { path: '/my-vocab', label: 'myVocab', icon: AcademicCapIcon },
  { path: '/system-vocab', label: 'systemVocab', icon: BookOpenIcon },
  { path: '/profile', label: 'profile', icon: UserCircleIcon },
  { path: '/settings', label: 'settings', icon: Cog6ToothIcon },
];