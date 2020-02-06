export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  application: SDK.ApplicationAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface ApplicationAPI {
    /**
     * List all applications
     */
    listApplications(req: ListApplicationsRequest): Promise<ListApplicationsResponse>;
    /**
     * Create an application
     */
    createApplication(req: CreateApplicationRequest): Promise<CreateApplicationResponse>;
    /**
     * Find application by id
     */
    showApplicationById(req: ShowApplicationByIdRequest): Promise<ShowApplicationByIdResponse>;
    /**
     * Update application
     */
    updateApplication(req: UpdateApplicationRequest): Promise<UpdateApplicationResponse>;
    /**
     *
     */
    deleteApplication(req: DeleteApplicationRequest): Promise<DeleteApplicationResponse>;
  }

  type ListApplicationsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: string;

      filter: {
        name?: string;
        identity?: number;
        phone?: string;
        plate?: string;
        state?: "REQUEST" | "ACCEPT" | "REJECT";
      };
    };
  };

  type ListApplicationsResponse = {
    body: [Application];
    headers: {
      xTotalCount: number;
    };
  };

  type CreateApplicationRequest = {
    body: Application;
  };

  type CreateApplicationResponse = {
    body: Application;
  };

  type ShowApplicationByIdRequest = {
    applicationId: string;
  };

  type ShowApplicationByIdResponse = {
    body: Application;
  };

  type UpdateApplicationRequest = {
    applicationId: string;
    body: Application;
  };

  type UpdateApplicationResponse = {
    body: Application;
  };

  type DeleteApplicationRequest = {
    applicationId: string;
  };

  type Application = {
    id: string;
    reviewedAt: string;
    reviewedBy: string;
    createdAt: string;
    name: string;
    identity: string;
    phone: string;
    plate: string;
    from: string;
    sick: boolean;
    reason: string;
    address: string;
    history: string;
    children: [
      {
        name: string;
        relation: string;
        age: number;
      }
    ];
    state: "REQUEST" | "ACCEPT" | "REJECT";
  };
  type ApplicationChild = {
    name: string;
    relation: string;
    age: number;
  };
  type Err = {
    code: string;
    message: string;
  };
}
