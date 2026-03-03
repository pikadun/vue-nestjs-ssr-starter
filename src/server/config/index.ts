import { type Config, ProductionConfig } from "./production.config";
import { DevelopmentConfig } from "./development.config";
import { AppEnv } from "../utils/env";
import deepmerge from "deepmerge";

let config = ProductionConfig;

if (config.appEnv === AppEnv.Development) {
    config = deepmerge(config, DevelopmentConfig) as Config;
}

export { config };
