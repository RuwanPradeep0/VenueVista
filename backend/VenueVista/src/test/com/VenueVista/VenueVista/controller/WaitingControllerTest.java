package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.service.WaitingService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class WaitingControllerTest {

    private MockMvc mockMvc;

    @Mock
    private WaitingService waitingService;

    @InjectMocks
    private WaitingController waitingController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(waitingController).build();
    }



//    @Test
//    public void testGetUserWaitings() throws Exception {
//        // Mocking the service method
//        String email = "test@example.com";
//
//        UserWaitingResponse response1 = new UserWaitingResponse(1, "Test waiting 1");
//        UserWaitingResponse response2 = new UserWaitingResponse(2, "Test waiting 2");
//
//        List<UserWaitingResponse> responses = Arrays.asList(response1, response2);
//
//        when(waitingService.getUserWaitings(email)).thenReturn(responses);
//
//        // Performing the GET request
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/waiting/user")
//                        .param("email", email))
//                .andExpect(status().isOk())
//                .andExpect(content().json("[{\"id\":1,\"details\":\"Test waiting 1\"},{\"id\":2,\"details\":\"Test waiting 2\"}]"))
//                .andReturn();
//    }

    @Test
    public void testDeleteUserWaiting() throws Exception {
        // Mocking the service method
        Integer waitingId = 1;
        doNothing().when(waitingService).deleteUserWaitng(waitingId);

        // Performing the DELETE request
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/waiting/deleteuserwaitings")
                        .param("waitingId", waitingId.toString()))
                .andExpect(status().isOk())
                .andExpect(content().string("Waiting deleted successfully"))
                .andReturn();
    }
}
