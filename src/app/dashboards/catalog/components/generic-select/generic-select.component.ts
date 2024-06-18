import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['./generic-select.component.scss'],
})
export class GenericSelectComponent implements OnInit {
  data = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        'https://crm-develop.grainchain.io/api/v1/commodities/search?limit=100&search=',
        this.request
      )
      .subscribe((resp: any) => (this.data = resp.data));
  }

  get request() {
    const params = {};
    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EUkJSRVUxTXpCRVF6STRNRGd6T1RCRU1EZ3hOVGRFTlROR1JUazNORU0xTnpJeE16STROZyJ9.eyJodHRwOi8vd3d3LmdyYWluY2hhaW4uaW8vcm9sZXMiOlsiYnItYm9ycm93ZXIiLCJici1idXllciIsImJyLWxlbmRlciJdLCJpc3MiOiJodHRwczovL2dyYWluY2hhaW5kZXYuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzMWZhNmViODYzYmFmMmFjMDBlYzJiOSIsImF1ZCI6Imh0dHBzOi8vZ3JhaW5jaGFpbmRldi5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3NDU5NzMyMCwiZXhwIjoxNjc3MTg5MzIwLCJhenAiOiJzWXF4dkFnMk0yQmJLcnpEZDlGR2t2NU52YUFOeFJZcCIsInNjb3BlIjoicmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBkZWxldGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgY3JlYXRlOmN1cnJlbnRfdXNlcl9kZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmN1cnJlbnRfdXNlcl9kZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmN1cnJlbnRfdXNlcl9pZGVudGl0aWVzIiwiZ3R5IjoicGFzc3dvcmQifQ.eK4yJGhIcwtXbp0xwyrhmoO5u6xsbv1KQSpeqLTHlETiRmuX4Q_9gi_iBCEdrB9iB_nUy6tQVx8LOesyEduHJkBhuoex0zPhMwnHnyGDX_dHXSjFzI6r5uFZ5RDodTSpaD2gEIY1aRHura8w2qf_KRPMVoHLwfBa7dE_ilTMbpS2YgKzaCQncHMwYqHL5fhFZ6CntdZX22T-x2a-_qI5MHg3Ix09MRNzLzyypfaueOGZsfIlbCLhtIs4fD3CEHe5CqFx2hvWdABd24ef7rgtM9a1OFLS12AOHzTow3lObDXIRu3McqGMmb45J1Z-9q6ns4q_oY303N4r8_14-yxELw',
    };
    return {
      params,
      headers,
    };
  }

  itemsSelected(value: any) {}
}
