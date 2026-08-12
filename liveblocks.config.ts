// Define Liveblocks types for our application
declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
    };

    // Each thread has metadata to store its location on the page
    ThreadMetadata: {
      x: number;
      y: number;
      elementSelector?: string;
      elementText?: string;
      windowWidth?: number;
      windowHeight?: number;
      url?: string;
      userAgent?: string;
    };
    
    // Custom user info based on our dummy guest auth route
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
        color: string;
      };
    };
  }
}

export {};
