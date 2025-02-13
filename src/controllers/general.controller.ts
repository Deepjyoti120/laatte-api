import { Response, NextFunction } from 'express';
import { RolePermission } from '../models/role-permissions.entity';
import { User } from '../models/user.entity';
import ResponseHelper from '../services/ResponseHelper';
import { RolesArray } from '../shared/enums/role.enums';
import { Department } from '../models/department.entity';
import { Country } from '../models/Country.entity';
import { GenderTypesArray } from '../shared/enums/gender-type.enums';

export class GeneralController {
    static async basicInfo(req, res: Response, next: NextFunction) {
        const userdata = req.user as User;
        try {
            const role = userdata.role;
            const rolePermissions = await RolePermission.find({
                where: { role, module: { is_active: true }, feature: { is_active: true } },
            });
            const modulesSet = new Set<string>();
            const featuresSet = new Set<string>();
            rolePermissions.forEach((permission) => {
                const module = permission.module;
                if (!module.is_active) return;
                modulesSet.add(module.name);
                if (permission.feature && permission.feature.is_active) {
                    featuresSet.add(permission.feature.name);
                }
            });
            const modulesList = Array.from(modulesSet);
            const featuresList = Array.from(featuresSet);
            const accessList = {
                modules: modulesList,
                features: featuresList,
            };
            // Departments and Designations ['designations']
            const getDeptDesignations = await Department.find(
                {
                    relations: ['designations']
                }
            );
            const countries = await Country.find(
                {
                    relations: ['states']
                }
            );
            const data = {
                default_roles: RolesArray,
                permissions: accessList,
                department: getDeptDesignations,
                countries,
                default_genders: GenderTypesArray,
            };
            return ResponseHelper.success(res, data);
        } catch (error) {
            next(error);
        }
    }

    static async rolePermissions(req, res: Response, next: NextFunction) {
        const userdata = req.user as User;
        try {
            const role = userdata.role;
            const rolePermissions = await RolePermission.find({
                // where: { role, module: { is_active: true }, feature: { is_active: true } },
                relations: ['module', 'feature'],
            });
            // const modulesMap = new Map<string, { id: string; name: string }>();
            // const featuresList: { id: string; name: string }[] = [];
            // rolePermissions.forEach((permission) => {
            //     const module = permission.module;
            //     if (!module.is_active) return;
            //     if (!modulesMap.has(module.id)) {
            //         modulesMap.set(module.id, {
            //             id: module.id,
            //             name: module.name,
            //         });
            //     }
            //     if (permission.feature && permission.feature.is_active) {
            //         featuresList.push({
            //             id: permission.feature.id,
            //             name: permission.feature.name,
            //         });
            //     }
            // });
            // const modulesList = Array.from(modulesMap.values());
            // const accessList = {
            //     modules: modulesList,
            //     features: featuresList,
            // };
            // return ResponseHelper.success(res, accessList);
            const modulesSet = new Set<string>();
            const featuresSet = new Set<string>();
            // rolePermissions.forEach((permission) => {
            //     const module = permission.module;
            //     if (!module.is_active) return;
            //     modulesSet.add(module.name);
            //     if (permission.feature && permission.feature.is_active) {
            //         featuresSet.add(permission.feature.name);
            //     }
            // });
            const modulesList = Array.from(modulesSet);
            const featuresList = Array.from(featuresSet);
            const accessList = {
                modules: modulesList,
                features: featuresList,
            };
            return ResponseHelper.success(res, accessList);
        } catch (error) {
            next(error);
        }
    }
    static async profilePhotoUpdate(req, res: Response, next: NextFunction) {
        const userData = req.user as User;
        try {
            if (!req.file) {
                return ResponseHelper.notFound(res, "No file uploaded");
            }
            const user = await User.findOne({ where: { id: userData.id } });
            if (!user) {
                return ResponseHelper.notFound(res, "User not found");
            }
            user.profile_picture = req.file.path;
            await user.save();
            return ResponseHelper.success(res, user);
        } catch (error) {
            next(error);
        }
    }
}
