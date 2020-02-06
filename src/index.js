import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    let token = this.token;
    if (typeof token === "function") token = token();
    if (token) return `Bearer ${token}`;

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

  /**
   * application's methods
   */
  application = {
    /**
     * List all applications
     *
     * @param {ListApplicationsRequest} req listApplications request
     * @returns {Promise<ListApplicationsResponse>} A paged array of applications
     */
    listApplications: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/applications`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create an application
     *
     * @param {CreateApplicationRequest} req createApplication request
     * @returns {Promise<CreateApplicationResponse>} The Application created
     */
    createApplication: (req = {}) => {
      const { headers, body } = req;

      if (!body)
        throw new Error("requetBody is required for createApplication");

      return fetch(`${this.base}/applications`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Find application by id
     *
     * @param {ShowApplicationByIdRequest} req showApplicationById request
     * @returns {Promise<ShowApplicationByIdResponse>} Expected response to a valid request
     */
    showApplicationById: (req = {}) => {
      const { applicationId, headers } = req;

      if (!applicationId)
        throw new Error("applicationId is required for showApplicationById");

      return fetch(`${this.base}/applications/${applicationId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update application
     *
     * @param {UpdateApplicationRequest} req updateApplication request
     * @returns {Promise<UpdateApplicationResponse>} The application
     */
    updateApplication: (req = {}) => {
      const { applicationId, headers, body } = req;

      if (!applicationId)
        throw new Error("applicationId is required for updateApplication");
      if (!body)
        throw new Error("requetBody is required for updateApplication");

      return fetch(`${this.base}/applications/${applicationId}`, {
        method: "PUT",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     *
     *
     * @param {DeleteApplicationRequest} req deleteApplication request
     * @returns {Promise<DeleteApplicationResponse>} application deleted
     */
    deleteApplication: (req = {}) => {
      const { applicationId, headers } = req;

      if (!applicationId)
        throw new Error("applicationId is required for deleteApplication");

      return fetch(`${this.base}/applications/${applicationId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
