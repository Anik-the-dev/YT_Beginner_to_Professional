// Interface
export interface UserType extends Document {
    individual_id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  