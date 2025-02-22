export interface Question {
    category_id: string;
    created_at: string; // ISO date string
    description: string | null;
    id: string;
    is_required: boolean; // Changed from number to boolean for clarity
    options: {
      choices: object[]; // Replace `object` with a specific type if you have details on the choice structure
    };
    page_number: number;
    sequence: number;
    text: string;
    type: "multi_select" | "single_select" | "scroll_number"; // Add more types if necessary
    view_type: "multi_select_text" | "single_select_text" | "scroll_number"; // Add more if needed
  }
  

export const questData = {
  MovementAssessment: [
    "28ccf7e7-92a5-4052-a039-da92591a9e53",
    "1616d71d-ed62-4694-ab71-2981ec96f1de",
    "8fead086-becc-4a72-a7ce-ce4bcd531c09",
  ],
  NutritionAssessment:[
    '3aaf231b-cc96-4217-9561-4299830d24d3',
    "9dbdc99e-a26f-49a9-ade3-e5ff92bebd41",
    "c491a9bc-04c2-46e8-bafa-4ef649252117",
    "0a89746f-cd6e-4189-b96d-8a6591c6b524",
    "9a1f693e-3ac1-41bb-b4ca-1149b55c36df",
  ]
};
