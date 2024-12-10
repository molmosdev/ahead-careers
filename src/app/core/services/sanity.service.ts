/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, resource, signal } from '@angular/core';
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

  params = signal<{ type: string; singleton: boolean } | undefined>(undefined);
  data = resource({
    request: this.params,
    loader: async ({ request: params }) => {
      if (params) {
        const query = `*[_type == "${params.type}"]`;
        const data = await this.client.fetch(query);
        return params.singleton ? data[0] : data;
      }
    },
  });

  async getDataByType(type: string, singleton = false): Promise<any> {
    const query = `*[_type == "${type}"]`;
    const data = await this.client.fetch(query);
    return singleton ? data[0] : data;
  }

  transformBlockToHtml(block: any): string {
    return toHTML(block);
  }

  async deleteDocumentById(documentId: string): Promise<void> {
    try {
      await this.client.delete(documentId);
      console.log(`Documento con _id ${documentId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }
}
