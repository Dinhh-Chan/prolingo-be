import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { PlacementTestService } from "../services/placement-test.service";
import { PlacementTest } from "../entities/placement-test.entity";
import { CreatePlacementTestDto } from "../dto/create-placement-test.dto";
import { UpdatePlacementTestDto } from "../dto/update-placement-test.dto";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ConditionPlacementTestDto } from "../dto/condition-placement-test.dto";
import { SystemRole } from "@module/user/common/constant";

@Controller("placement-tests")
@ApiTags("PlacementTest")
export class PlacementTestController extends BaseControllerFactory<PlacementTest>(
    PlacementTest,
    ConditionPlacementTestDto,
    CreatePlacementTestDto,
    UpdatePlacementTestDto,
    {
        authorize: true,
        routes: {
            getMany: {
                enable: false,
            },
            getById: {
                roles: [SystemRole.ADMIN, SystemRole.USER],
            },
        },
    },
) {
    constructor(private readonly placementTestService: PlacementTestService) {
        super(placementTestService);
    }
}
