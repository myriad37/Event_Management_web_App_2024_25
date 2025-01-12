import { navHandler } from "../../scripts/main";
import { navCollapsible } from "../../scripts/collapsible";


// Define a TeamMember interface
interface TeamMember {
    name: string;
    role: string;
    description: string;
    socialMedia: string[];
  }
  
  // Create an array of TeamMember objects
  const teamMembers: TeamMember[] = [
    {
      name: "Blen Gebre",
      role: "Backend Engineer",
      description: "Blen is a backend engineer specializing in Django and NestJs. He is also a Machine Learning and Backend Engineer with NLP Specialization.",
      socialMedia: ["#1", "#2", "#3", "#4"],
    },
    {
      name: "saba habtamu",
      role: "Front-End Developer",
      description: "saba is a senior front-end developer with experience in React and VueJs. She is also a full-stack developer with experience in NestJS and Python. She is especially good at designing and implementing user interfaces.",
      socialMedia: ["#1", "#2", "#3", "#4"],
    },
    {
      name: "kalafate tezazu",
      role: "Backend Engineer",
      description: "kalafate drives the strategical and technical direction of the team. He is also a full-stack developer with experience in NestJS and Python. In addition to web, is especially interested in Embedded Systems..",
      socialMedia: ["#1", "#2", "#3", "#4"],
    },
    
    // Add more team members as needed
  ];
  
  // Function to generate HTML for a team member
  function generateTeamMemberHTML(member: TeamMember): string {
    return `
      <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <!-- <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="$ {imageUrl}" alt="$ {member.name} Avatar"> -->
        </a>
        <div class="p-5">
          <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">${member.name}</a>
          </h3>
          <span class="text-gray-500 dark:text-gray-400">${member.role}</span>
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">${member.description}</p>
          <ul class="flex space-x-4 sm:mt-0">
            ${member.socialMedia.map((link) => `<li><a href="${link}" class="text-gray-500 hover:text-gray-900 dark:hover:text-white"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="YOUR_SVG_PATH_HERE" clip-rule="evenodd"></path></svg></a></li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }
  

document.addEventListener('DOMContentLoaded', () => {
    navHandler();
    navCollapsible();

      // Generate HTML for all team members
    const teamHTML = teamMembers.map(generateTeamMemberHTML).join("");
    const teamContainer = document.querySelector("#teamContainer") as HTMLElement;
    if (teamContainer) {
      teamContainer.innerHTML = teamHTML;
    }
});