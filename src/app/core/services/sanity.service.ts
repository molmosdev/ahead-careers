/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client = createClient({
    projectId: environment.SANITY_PROJECT_ID,
    dataset: environment.SANITY_DATASET,
    apiVersion: new Date().toISOString().split('T')[0],
    useCdn: true,
  });

  constructor() {}

  async getDataByType(type: string, singleton = false): Promise<any> {
    const query = `*[_type == "${type}"]`;
    const data = await this.client.fetch(query);
    return singleton ? data[0] : data;
  }

  transformBlockToHtml(block: any): string {
    return toHTML(block);
  }
}
