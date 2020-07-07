import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "../../../config/config.service";
import { Configuration } from "../../../config/config.keys";
import { AuthRepository } from "../auth.repository";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IJwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
                private readonly _configService: ConfigService,
                @InjectRepository(AuthRepository)
                private readonly _authRepository: AuthRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET)
        })
    }

    async validate(payload: IJwtPayload){
        const {username} = payload
        const user = await this._authRepository.findOne({
            where: {username, status: 'ACTIVE'}
        })

        if(!user){
            throw new UnauthorizedException()
        }

        return payload
    }
}