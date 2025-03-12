// import { User } from "../models/user.entity";
// import { Request, Response, NextFunction } from "express";
// import ResponseHelper from "../services/ResponseHelper";
// import { Module } from "../models/module.entity";
// import { Feature } from "../models/feature.entity";
// import { getEnvironmentVariable } from "../environments/env";
// import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { DataSource } from "typeorm";
// import { Role } from "../shared/enums/role.enums";
// import { RolePermission } from "../models/role-permissions.entity";

// export class ModuleSeeder implements Seeder { 
//     public async run(
//         dataSource: DataSource,
//         factoryManager: SeederFactoryManager,
//       ): Promise<any> {
//         const features = {
//             employee: ['add', 'search'],
//             attendance: ['attendance', 'search'],
//             leave: ['leave', 'search'],
//             payroll: ['payroll', 'search'],
//             report: ['report', 'search'],
//             setting: ['setting', 'search'],
//             general: ['basic-info'],
//             role_permission: ['role_permission', 'search'],
//         };
//         await dataSource.transaction(async (manager) => {
//             try {
//                 const moduleNames = Object.keys(features);
//                 for (const moduleName of moduleNames) {
//                     let module = await manager.findOne(Module, { where: { name: moduleName } });
//                     if (!module) {
//                         module = manager.create(Module, { name: moduleName });
//                         await manager.save(Module, module);
//                     }
//                     for (const featureName of features[moduleName]) {
//                         let feature = await manager.findOne(Feature, {
//                             where: { name: featureName, module: { id: module.id } },
//                         });
//                         if (!feature) {
//                             feature = manager.create(Feature, { name: featureName, module });
//                             await manager.save(Feature, feature);
//                         }
//                     }
//                 }
//                 // module and feature assign as per user role
//                 const roleAssignments = {
//                     [Role.ADMIN]: {
//                         employee: ['add', 'search'],
//                         attendance: ['attendance', 'search'],
//                         leave: ['leave', 'search'],
//                         payroll: ['payroll', 'search'],
//                         report: ['report', 'search'],
//                         setting: ['setting', 'search'],
//                         general: ['basic-info'],
//                         role_permission: ['role_permission', 'search'],
//                     },
//                     // [Role.MANAGER]: {
//                     //     employee: ['search'],
//                     //     attendance: ['search'],
//                     //     report: ['search'],
//                     // },
//                     // [Role.EMPLOYEE]: {
//                     //     general: ['basic-info'],
//                     // },
//                     // [Role.HR]: {
//                     //     employee: ['add', 'search'],
//                     //     attendance: ['attendance', 'search'],
//                     //     leave: ['leave', 'search'],
//                     // },
//                     // [Role.SUPERVISOR]: {
//                     //     attendance: ['attendance'],
//                     //     report: ['search'],
//                     // },
//                 };
//                 for (const [roleKey, moduleFeatures] of Object.entries(roleAssignments)) {
//                     const role = roleKey as Role;
//                     for (const [moduleName, featureList] of Object.entries(moduleFeatures)) {
//                         // Find or create the module
//                         let module = await manager.findOne(Module, { where: { name: moduleName } });
//                         if (!module) {
//                             module = manager.create(Module, { name: moduleName });
//                             await manager.save(Module, module);
//                         }
//                         for (const featureName of featureList) {
//                             let feature = await manager.findOne(Feature, {
//                                 where: { name: featureName, module: { id: module.id } },
//                             });
//                             if (!feature) {
//                                 feature = manager.create(Feature, { name: featureName, module });
//                                 await manager.save(Feature, feature);
//                             }
//                             const rolePermission = await manager.findOne(RolePermission, {
//                                 where: {
//                                     role,
//                                     module: { id: module.id },
//                                     feature: { id: feature.id },
//                                 },
//                             });
//                             if (!rolePermission) {
//                                 const newRolePermission = manager.create(RolePermission, {
//                                     role,
//                                     module,
//                                     feature,
//                                 });
//                                 await manager.save(RolePermission, newRolePermission);
//                             }
//                         }
//                     }}
//             } catch (e) {
//                 throw e;
//             }
//         }).catch((error) => {
//             // next(error);
//             console.log(error);
//         });
//       }
// }
