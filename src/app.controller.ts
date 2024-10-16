import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

export class SubmitTextDto {
  text1: string;
  text2: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('submit')
  handleSubmit(@Body() submitTextDto: SubmitTextDto): {
    result: boolean;
    sorted1: any;
    sorted2: any;
  } {
    const { text1, text2 } = submitTextDto;
    const { result, sorted1, sorted2 } = this.appService.findDifferences(
      text1,
      text2,
    );
    return { result, sorted1, sorted2 };
  }
}
