import ResponseCode from 'apis/ResponseCode';
import AuthenApi from 'apis/subs/authen/AuthApi';
import axios from 'axios';
import { LocationObj } from 'components/modals/SelectModal';
import mockedResponse from '__tests__/CommonResponse';
import locationsMocked from '__tests__/data/verifyInfoUserScreen/Location.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

async function getListLocation(url: string) {
  try {
    const res: any = await AuthenApi.getListLocation<LocationObj[]>(url);
    if (res.status === ResponseCode.SUCCESS) {
      return res.data;
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

describe('getListLocation()', () => {
  it('should return location list', async () => {
    //Our desired output
    const locations: LocationObj[] = locationsMocked;

    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(
      mockedResponse<LocationObj[]>(locations)
    );
    expect(jest.spyOn(axios, 'get')).not.toHaveBeenCalled();
    const data = await getListLocation(
      'https://dudu-uat.mcredit.com.vn/location-service/bpm/location/v1/provinces'
    );
    expect(jest.spyOn(axios, 'get')).toHaveBeenCalled();
    expect(data).toEqual(locations);
  });
});
