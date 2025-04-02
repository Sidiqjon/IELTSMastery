import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SiteMetadataModule } from './sitemetadata/sitemetadata.module';
import { MailModule } from './mail/mail.module';
import { UploadModule } from './upload/upload.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [PrismaModule, SiteMetadataModule, MailModule, UploadModule, RegionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
