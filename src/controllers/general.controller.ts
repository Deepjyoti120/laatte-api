import { Response, NextFunction } from 'express';
import { User } from '../models/user.entity';
import ResponseHelper from '../services/ResponseHelper';
import { RolesArray } from '../shared/enums/role.enums';
import { GenderTypesArray } from '../shared/enums/gender-type.enums';

export class GeneralController {
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
