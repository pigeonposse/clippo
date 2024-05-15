/**
 * Types file.
 *
 * @module Updater
 */

import type { box } from '@clippo/styles'

/**
 * Options for the updater function.
 */
export type UpdaterOptions = {
    /** The name of the package. */
    name: string;
    /** The current version of the package. */
    version: string;
    /**
     * A custom message function to display update information. 
     */
    message?: ( opts: UpdaterOptionsMessageParams ) => string;
    /**
     * Configuration options for the box used to display update information.
     *
     * @default {
      title          : 'Update available',
      textAlignment  : 'center',
      titleAlignment : 'center',
      padding        : 1,
      margin         : 1,
      borderColor    : 'yellow',
      borderStyle    : 'round',
      }
     */
    box?: Parameters<typeof box>[1];
};

/**
 * Parameters for the updater message function.
 */
export type UpdaterOptionsMessageParams = {
    /** The name of the package. */
    name: string;
    /** The current version of the package. */
    currentVersion: string;
    /** The latest version of the package. */
    latestVersion: string;
    /** The command to update the package. */
    updateCommand: string;
};
