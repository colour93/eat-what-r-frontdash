import { getCurrentInstance } from 'vue';

export default function getGlobalProperties() {
  const { emit, appContext: { app: { config: { globalProperties } } } } = getCurrentInstance();

  return { ...globalProperties };
}