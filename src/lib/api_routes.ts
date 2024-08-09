export const CreateDepartment = `${process.env.NEXT_PUBLIC_BACKEND_API}departments/create-department`;
export const EditDepartment = (id: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}departments/update-department/${id}`;
export const GetDepartmentsByOrganization = `${process.env.NEXT_PUBLIC_BACKEND_API}departments/get-departments-by-organization`;
export const CreateCompany = `${process.env.NEXT_PUBLIC_BACKEND_API}organizations/create-organization`;
export const ForgotPassword = `${process.env.NEXT_PUBLIC_BACKEND_API}auth/forgot-password`;
export const ResetPassword = (id: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}auth/reset-password/${id}`;
export const LogIn = `${process.env.NEXT_PUBLIC_BACKEND_API}auth/login`;
export const Register = `${process.env.NEXT_PUBLIC_BACKEND_API}auth/signup`;
export const EmailVerification = (token: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}auth/verify?token=${token}`;
export const GetUserOrganizations = `${process.env.NEXT_PUBLIC_BACKEND_API}organizations/user-organizations`;
export const InviteUser = `${process.env.NEXT_PUBLIC_BACKEND_API}auth/invite-user`;
export const GetDepartmentById = (departmentId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}departments/get-department/${departmentId}`;
export const DeleteMember = (memberId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}auth/delete-user/${memberId}`;
export const GetUserOrganizationById = `${process.env.NEXT_PUBLIC_BACKEND_API}organizations/get-user-organization`;
export const DeleteDepartment = (departmentId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}departments/delete-department/${departmentId}`;
export const AddLead = `${process.env.NEXT_PUBLIC_BACKEND_API}leads/create-lead`;
export const GetLeadsByOrganization = `${process.env.NEXT_PUBLIC_BACKEND_API}leads/get-leads-by-organization`;
export const Createproduct = `${process.env.NEXT_PUBLIC_BACKEND_API}products/create-product`;
export const GetProducts = `${process.env.NEXT_PUBLIC_BACKEND_API}products/organization-products`;
export const GetProductsByOrganization = `${process.env.NEXT_PUBLIC_BACKEND_API}products/organization-products`;

export const CreateVisit = `${process.env.NEXT_PUBLIC_BACKEND_API}visits/create-visit`;
export const FetchVisits = `${process.env.NEXT_PUBLIC_BACKEND_API}visits/get-all-visits`;
export const FetchVisit = (visitId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}visits/get-visit/${visitId}`;
export const GetUser = (UserId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}auth/get-user/${UserId}`;
export const ChangeStatus = (leadId?: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}leads/update-lead/${leadId}`;
export const CreateSale = (leadId?: string) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}sales/create-sale/${leadId}`;
export const DeleteProduct = (productId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}products/delete-product/${productId}`;
export const DeleteLead = (leadId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}leads/delete-lead/${leadId}`;
export const AdminDashboard = `${process.env.NEXT_PUBLIC_BACKEND_API}dashboard/sales-admin`;
export const GetUsers = `${process.env.NEXT_PUBLIC_BACKEND_API}auth/get-users-by-organization`;
export const AssignDepartment = (userId: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}departments/add-user/${userId}`;
export const AddNewProposal = `${process.env.NEXT_PUBLIC_BACKEND_API}proposals/create-proposal`;
export const GetAllProposals = `${process.env.NEXT_PUBLIC_BACKEND_API}proposals/get-all-proposals`;
export const GetProposalById = (proposalId: string | string[]) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}proposals/get-proposal/${proposalId}`;
export const GetReport = (userId: string | null, selectedDate: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}reports/user/${userId}/sales?selectedDate=${selectedDate}`;
export const UpdateUser = (id: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}auth/update-profile/${id}`;
export const SetTarget = `${process.env.NEXT_PUBLIC_BACKEND_API}targets/set-targets`;
export const SalesSummary = (selectedDate: string | null) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}reports/sales/summary?selectdDate=${selectedDate}`;
export const GetProductById = (productId: string | string[]) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}products/product/${productId}`;
export const GetLeadById = (leadId: string | string[]) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}leads/get-lead/${leadId}`;
export const UserDashboard = `${process.env.NEXT_PUBLIC_BACKEND_API}dashboard/sales-user`;
export const GetUserLeads = (userId: string | string[]) =>
  `${process.env.NEXT_PUBLIC_BACKEND_API}leads/leads/user/${userId}`;
export const GetUserProposals = `${process.env.NEXT_PUBLIC_BACKEND_API}proposals/user-proposals`;
export const GetUserVisits = `${process.env.NEXT_PUBLIC_BACKEND_API}visits/user-visits`;
