export  type TResError = {
    status: number;
    data: {
      message: string;
      stack?: string;
      success: boolean;
    };
  };