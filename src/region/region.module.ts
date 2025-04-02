import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
// import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}