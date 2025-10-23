import API_ENDPOINTS from "@/constants/endpoints";

type Params = Record<string, string | number>;

const buildUrl = (template: string, params: Params = {}) => {
  return template.replace(/{(.*?)}/g, (_, key) => encodeURIComponent(params[key]));
}

export { API_ENDPOINTS, buildUrl };