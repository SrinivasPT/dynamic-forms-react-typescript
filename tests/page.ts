import { Page } from '@playwright/test';
import { loadConfigAndData } from './library/Database';
import { PageConfig } from './library/SmartTypes';

export class PageObject {
    config: PageConfig;
    data: any;

    loadData = async (pageName: string, id: number) => {
        loadConfigAndData(pageName, id).then((values) => {
            this.config = values[0].data;
            this.data = values[1].data;
        });
    };

    fillSection = async (sectionName: string, page: Page) => {
        const sectionConfig = this.config.sectionRepository.find((formSection) => formSection.id === sectionName);
        await sectionConfig?.controlGroup.map((element) => {
            if (element.type === 'TEXT') page.getByTestId(element.id).fill('Hello');
        });
    };
}
