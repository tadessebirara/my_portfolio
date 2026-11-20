export interface Profile {
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  location: string;
  bio: string;
}

export const profile: Profile = {
  name: "Tadesse",
  role: "Software Engineer & Digital Solutions Developer",
  /* EDIT: Replace with your actual email */
  email: "your.email@example.com",
  /* EDIT: Replace with your actual phone */
  phone: "+251 XXX XXX XXX",
  /* EDIT: Replace with your actual WhatsApp number */
  whatsapp: "251XXXXXXXXX",
  /* EDIT: Replace with your actual LinkedIn URL */
  linkedin: "https://linkedin.com/",
  /* EDIT: Replace with your actual GitHub URL */
  github: "https://github.com/",
  location: "Ethiopia",
  bio: "Software Engineering student in my final year, building digital solutions that solve real business problems.",
};
