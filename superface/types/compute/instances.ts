import { typeHelper, TypedProfile } from '@superfaceai/one-sdk';
export type CreateInstanceInput = {
    /** Human-readable name of the instance **/
    name: string;
    /** Shape representing CPU, CPU manufacturer and memory **/
    shape: 'tiny_intel' | 'tiny_amd' | 'small_intel' | 'small_amd' | 'medium_intel' | 'medium_amd' | 'large_intel' | 'large_amd';
    /** Image with operating system to create intance with **/
    image: 'ubuntu_lts' | 'ubuntu_latest' | 'debian_9' | 'debian_10' | 'fedora_33' | 'fedora_34' | 'centos_7' | 'centos_8';
    /**
     * Region in which the instance should be created
     * For each region datacenter location is selected according to folowing table:
     *
     * | region | Prefered location | Fallback location |
     * |--------|---------------------|---------------------|
     * |   EU   |      Frankfurt      |       Ireland       |
     * |   US   |    San Francisco    |       New York      |
     **/
    region: 'EU' | 'US';
    /** Public keys to allow access to instance **/
    sshKeys?: string[];
};
export type CreateInstanceResult = {
    /**
     * Unique Instance identifier
     * This is crated automatical during instance creation
     **/
    id?: string;
    /** Human-readable name of the instance **/
    name?: string;
    /** Status indicating the state of the instance **/
    status?: 'new' | 'provisioning' | 'active' | 'rebooting' | 'shuttingOff' | 'off';
    /** List of IPv4 and IPv6 addresses **/
    publicIps?: string[];
    /**
     * Region in which the instance should be created
     * For each region datacenter location is selected according to folowing table:
     *
     * | region | Prefered location | Fallback location |
     * |--------|---------------------|---------------------|
     * |   EU   |      Frankfurt      |       Ireland       |
     * |   US   |    San Francisco    |       New York      |
     **/
    region?: 'EU' | 'US';
    /** Shape representing CPU, CPU manufacturer and memory **/
    shape?: 'tiny_intel' | 'tiny_amd' | 'small_intel' | 'small_amd' | 'medium_intel' | 'medium_amd' | 'large_intel' | 'large_amd';
    /** Image with operating system to create intance with **/
    image?: 'ubuntu_lts' | 'ubuntu_latest' | 'debian_9' | 'debian_10' | 'fedora_33' | 'fedora_34' | 'centos_7' | 'centos_8';
    /** Datetime string in ISO 8601 representation **/
    createdAt?: string;
};
export type InstanceInfoInput = {
    /**
     * Unique Instance identifier
     * This is crated automatical during instance creation
     **/
    id?: string;
};
export type InstanceInfoResult = {
    /**
     * Unique Instance identifier
     * This is crated automatical during instance creation
     **/
    id?: string;
    /** Human-readable name of the instance **/
    name?: string;
    /** Status indicating the state of the instance **/
    status?: 'new' | 'provisioning' | 'active' | 'rebooting' | 'shuttingOff' | 'off';
    /** List of IPv4 and IPv6 addresses **/
    publicIps?: string[];
    /**
     * Region in which the instance should be created
     * For each region datacenter location is selected according to folowing table:
     *
     * | region | Prefered location | Fallback location |
     * |--------|---------------------|---------------------|
     * |   EU   |      Frankfurt      |       Ireland       |
     * |   US   |    San Francisco    |       New York      |
     **/
    region?: 'EU' | 'US';
    /** Shape representing CPU, CPU manufacturer and memory **/
    shape?: 'tiny_intel' | 'tiny_amd' | 'small_intel' | 'small_amd' | 'medium_intel' | 'medium_amd' | 'large_intel' | 'large_amd';
    /** Image with operating system to create intance with **/
    image?: 'ubuntu_lts' | 'ubuntu_latest' | 'debian_9' | 'debian_10' | 'fedora_33' | 'fedora_34' | 'centos_7' | 'centos_8';
    /** Datetime string in ISO 8601 representation **/
    createdAt?: string;
};
const profile = {
    /**
     * Create Server Instance
     * Allows to craete server instance in given region, shape and image.
     * Optionally public ssh keys can be provided to access instance.
     **/
    "CreateInstance": typeHelper<CreateInstanceInput, CreateInstanceResult>(),
    /**
     * Get Instance Information
     * Returns information about instance and it's status.
     **/
    "InstanceInfo": typeHelper<InstanceInfoInput, InstanceInfoResult>()
};
export type ComputeInstancesProfile = TypedProfile<typeof profile>;
export const computeInstances = {
    "compute/instances": profile
};
