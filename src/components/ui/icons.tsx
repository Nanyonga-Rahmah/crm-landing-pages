import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bell,
  CalendarCheck,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardType,
  Command,
  CreditCard,
  Eye,
  EyeOff,
  File,
  FileBarChart,
  FileText,
  GanttChartSquare,
  HelpCircle,
  Hotel,
  Hourglass,
  Image,
  Key,
  Landmark,
  Laptop,
  Layers,
  LayoutDashboard,
  Loader2,
  Locate,
  LucideProps,
  Luggage,
  Mail,
  Menu,
  Moon,
  MoreVertical,
  Phone,
  Pizza,
  Plus,
  Receipt,
  Search,
  Settings,
  Shield,
  Star,
  SunMedium,
  Trash,
  TrendingDown,
  TrendingUp,
  Twitter,
  Upload,
  UploadCloud,
  User,
  UserCog,
  Users2,
  X,
} from 'lucide-react';

export const Icons = {
  alertCircle: AlertCircle,
  logo: Command,
  bed: BedDouble,
  bell: Bell,
  calendar: CalendarCheck,
  close: X,
  eye: Eye,
  eyeOff: EyeOff,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  landmark: Landmark,
  luggage: Luggage,
  fileBarChart: FileBarChart,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  menu: Menu,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  search: Search,
  moon: Moon,
  laptop: Laptop,
  dashboard: LayoutDashboard,
  users: Users2,
  arrowLeft: ArrowLeft,
  locate: Locate,
  upload: Upload,
  uploadCloud: UploadCloud,
  key: Key,
  hourglass: Hourglass,
  hotel: Hotel,
  mail: Mail,
  phone: Phone,
  userCog: UserCog,
  plan: GanttChartSquare,
  receipt: Receipt,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  subscription: CircleDollarSign,
  ChevronDown: ChevronDown,
  CheckCircle: CheckCircle2,
  Star: Star,
  CheckCheck: CheckCheck,
  inventory: Layers,
  houseKeeping: ClipboardType,
  sheild: Shield,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  sort: ({ ...props }: LucideProps) => (
    <svg
      width="11"
      height="15"
      viewBox="0 0 11 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.659141 5.93177H9.88629C10.0648 5.93177 10.2193 5.86659 10.3497 5.73612C10.48 5.60569 10.5455 5.45124 10.5455 5.27273C10.5455 5.09422 10.4801 4.93984 10.3497 4.80923L5.73612 0.195643C5.60577 0.0653586 5.45135 0 5.27273 0C5.09411 0 4.9397 0.0653586 4.80923 0.195643L0.195643 4.80923C0.0651783 4.9397 0 5.09422 0 5.27273C0 5.45121 0.0651783 5.60569 0.195643 5.73612C0.326252 5.86659 0.480667 5.93177 0.659141 5.93177Z"
        fill="#D3D6E4"
      />
      <path
        d="M9.88629 8.56836H0.659141C0.480523 8.56836 0.326108 8.63357 0.195643 8.76389C0.0651783 8.89436 0 9.04877 0 9.22728C0 9.40579 0.0651783 9.56032 0.195643 9.69071L4.80923 14.3042C4.93984 14.4347 5.09426 14.5 5.27273 14.5C5.45121 14.5 5.60577 14.4347 5.73612 14.3042L10.3497 9.69067C10.48 9.56032 10.5455 9.40579 10.5455 9.22725C10.5455 9.04877 10.4801 8.89436 10.3497 8.76386C10.2194 8.63343 10.0648 8.56836 9.88629 8.56836Z"
        fill="#D3D6E4"
      />
    </svg>
  ),
  checkInShadowed: ({ ...props }: LucideProps) => (
    <svg
      width="95"
      height="95"
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="47.5" cy="46.5" r="40.5" fill="#50B547" />
      <path
        d="M88 47.5C88 69.8675 69.8675 88 47.5 88C25.1325 88 7 69.8675 7 47.5C7 25.1325 25.1325 7 47.5 7C69.8675 7 88 25.1325 88 47.5Z"
        stroke="url(#paint0_linear_7_358)"
        strokeWidth="14"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.3333 53.3334V56.5C35.3333 59.9992 38.169 62.8334 41.6666 62.8334H57.5C60.9991 62.8334 63.8333 59.9992 63.8333 56.5C63.8333 51.2291 63.8333 42.7725 63.8333 37.5C63.8333 34.0024 60.9991 31.1667 57.5 31.1667C52.9732 31.1667 46.195 31.1667 41.6666 31.1667C38.169 31.1667 35.3333 34.0024 35.3333 37.5V40.6667C35.3333 41.5407 36.0426 42.25 36.9166 42.25C37.7906 42.25 38.5 41.5407 38.5 40.6667C38.5 40.6667 38.5 39.1831 38.5 37.5C38.5 35.752 39.9186 34.3334 41.6666 34.3334H57.5C59.2495 34.3334 60.6666 35.752 60.6666 37.5V56.5C60.6666 58.2496 59.2495 59.6667 57.5 59.6667C52.9732 59.6667 46.195 59.6667 41.6666 59.6667C39.9186 59.6667 38.5 58.2496 38.5 56.5C38.5 54.8185 38.5 53.3334 38.5 53.3334C38.5 52.4609 37.7906 51.75 36.9166 51.75C36.0426 51.75 35.3333 52.4609 35.3333 53.3334ZM47.3445 45.4167L45.2972 43.371C44.6797 42.7519 44.6797 41.7497 45.2972 41.1306C45.9163 40.5131 46.9185 40.5131 47.536 41.1306L52.286 45.8806C52.9051 46.4997 52.9051 47.5019 52.286 48.121L47.536 52.871C46.9185 53.4885 45.9163 53.4885 45.2972 52.871C44.6797 52.2519 44.6797 51.2497 45.2972 50.6306L47.3445 48.5834H33.75C32.876 48.5834 32.1666 47.874 32.1666 47C32.1666 46.1276 32.876 45.4167 33.75 45.4167H47.3445Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7_358"
          x1="95.5"
          y1="-5.5"
          x2="-4"
          y2="94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFFFA8" />
          <stop offset="1" stopColor="#FFFDCA" />
        </linearGradient>
      </defs>
    </svg>
  ),
  checkOutShadowed: ({ ...props }: LucideProps) => (
    <svg
      width="95"
      height="95"
      viewBox="0 0 95 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="47.5" cy="46.5" r="40.5" fill="#FD554A" />
      <path
        d="M88 47.5C88 69.8675 69.8675 88 47.5 88C25.1325 88 7 69.8675 7 47.5C7 25.1325 25.1325 7 47.5 7C69.8675 7 88 25.1325 88 47.5Z"
        stroke="url(#paint0_linear_7_364)"
        strokeWidth="14"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.4059 45.4167L33.4532 43.371C34.0707 42.7519 34.0707 41.7497 33.4532 41.1306C32.8341 40.5131 31.8318 40.5131 31.2143 41.1306L26.4643 45.8806C25.8452 46.4997 25.8452 47.5019 26.4643 48.121L31.2143 52.871C31.8318 53.4885 32.8341 53.4885 33.4532 52.871C34.0707 52.2519 34.0707 51.2497 33.4532 50.6306L31.4059 48.5834H45.0004C45.8744 48.5834 46.5837 47.874 46.5837 47C46.5837 46.1276 45.8744 45.4167 45.0004 45.4167H31.4059Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 53.3334V56.5C37 59.9992 39.8357 62.8334 43.3333 62.8334H59.1667C62.6658 62.8334 65.5 59.9992 65.5 56.5C65.5 51.2291 65.5 42.7725 65.5 37.5C65.5 34.0024 62.6658 31.1667 59.1667 31.1667C54.6399 31.1667 47.8617 31.1667 43.3333 31.1667C39.8357 31.1667 37 34.0024 37 37.5V40.6667C37 41.5407 37.7093 42.25 38.5833 42.25C39.4573 42.25 40.1667 41.5407 40.1667 40.6667C40.1667 40.6667 40.1667 39.1831 40.1667 37.5C40.1667 35.752 41.5853 34.3334 43.3333 34.3334H59.1667C60.9163 34.3334 62.3333 35.752 62.3333 37.5V56.5C62.3333 58.2496 60.9163 59.6667 59.1667 59.6667C54.6399 59.6667 47.8617 59.6667 43.3333 59.6667C41.5853 59.6667 40.1667 58.2496 40.1667 56.5C40.1667 54.8185 40.1667 53.3334 40.1667 53.3334C40.1667 52.4609 39.4573 51.75 38.5833 51.75C37.7093 51.75 37 52.4609 37 53.3334Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7_364"
          x1="83"
          y1="5"
          x2="13.5"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA296" />
          <stop offset="1" stopColor="#F7FFC2" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
