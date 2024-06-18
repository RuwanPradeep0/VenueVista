package com.VenueVista.VenueVista.controller;

import com.VenueVista.VenueVista.controller.RequestResponse.SpaceRequest;
import com.VenueVista.VenueVista.models.Space;
import com.VenueVista.VenueVista.service.SpaceService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(SpaceController.class)
public class SpaceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SpaceService spaceService;

    @InjectMocks
    private SpaceController spaceController;

    @Test
    public void testCreateSpace() throws Exception {
        SpaceRequest request = new SpaceRequest();
        request.setName("Test Space");
        request.setDescription("This is a test space");

        Space savedSpace = new Space();
        savedSpace.setId(1); // Using int instead of long

        when(spaceService.saveSpace(any(SpaceRequest.class))).thenReturn(savedSpace);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/spaces/createspaces")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Space\",\"description\":\"This is a test space\"}"))
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"id\":1,\"name\":\"Test Space\",\"description\":\"This is a test space\"}"));
    }

    @Test
    public void testGetAllSpaces() throws Exception {
        Space space1 = new Space();
        space1.setId(1);
        space1.setName("Space 1");
        space1.setDescription("Description of Space 1");

        Space space2 = new Space();
        space2.setId(2);
        space2.setName("Space 2");
        space2.setDescription("Description of Space 2");

        List<Space> spaces = Arrays.asList(space1, space2);

        when(spaceService.getAllSpaces()).thenReturn(spaces);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/spaces/getallspaces"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"name\":\"Space 1\",\"description\":\"Description of Space 1\"}," +
                        "{\"id\":2,\"name\":\"Space 2\",\"description\":\"Description of Space 2\"}]"));
    }
}
